from flask import Flask, request
import os
from flask_cors import CORS
from llama_index import StorageContext, load_index_from_storage, VectorStoreIndex, SimpleDirectoryReader
from dotenv import load_dotenv
import boto3
import json

app = Flask(__name__)
CORS(app)
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')

load_dotenv(dotenv_path)

bedrock_client = boto3.client('bedrock-runtime')


def initialize_local_index():
    global index

    target_cleansed_corpus = "json_out"
    documents = SimpleDirectoryReader(target_cleansed_corpus).load_data()
    index = VectorStoreIndex.from_documents(documents)

    storage_context = StorageContext.from_defaults(persist_dir="storage")
    print("Index initialization complete.")
    index = load_index_from_storage(storage_context)


initialize_local_index()


@app.route("/api/chatbot", methods=["POST"])
def chatbot():
    user_message = request.json.get("message", "")
    local_response = ""

    try:
        query_engine = index.as_query_engine()
        context = str(query_engine.query(user_message))
        print(f'########### Context from local index: {context}')

        model_id = 'meta.llama2-70b-chat-v1'
        response = bedrock_client.invoke_model(
            body=json.dumps({
                "prompt": context,
                "max_gen_len": 512,
                "temperature": 0.7,
                "top_p": 0.9
            }),
            modelId=model_id,
            accept='application/json',
            contentType='application/json'
        )

        response_body = json.loads(response['Body'].read())
        local_response = response_body['generation']
    except Exception as e:
        print(f"Error: {e}")
        local_response = "An error occurred."

    return local_response


if __name__ == '__main__':
    app.run(port=4000)
