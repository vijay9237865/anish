# from flask import Flask, request
# import os
# from flask_cors import CORS
# from llama_index import StorageContext, load_index_from_storage, VectorStoreIndex, SimpleDirectoryReader
# from dotenv import load_dotenv
# # import openai

# app = Flask(__name__)
# CORS(app)
# dotenv_path = os.path.join(os.path.dirname(__file__), '.env')

# load_dotenv(dotenv_path)

# print(f"API Key from env: {os.getenv('OPENAI_API_KEY')}")


# def initialize_openai_and_local_index():
#     global index
#     openai.api_key = os.getenv('OPENAI_API_KEY')

#     target_cleansed_corpus = "json_out"
#     documents = SimpleDirectoryReader(target_cleansed_corpus).load_data()
#     index = VectorStoreIndex.from_documents(documents)

#     storage_context = StorageContext.from_defaults(persist_dir="storage")
#     print("Index initialization complete.")
#     index = load_index_from_storage(storage_context)


# initialize_openai_and_local_index()


# @app.route("/api/chatbot", methods=["POST"])
# def chatbot():
#     user_message = request.json.get("message", "")

#     try:
#         query_engine = index.as_query_engine()
#         local_response = str(query_engine.query(user_message))
#         print(f'########### Local response: {local_response}')
#     except Exception as e:
#         print(f"Error querying local index: {e}")

#     return local_response


# if __name__ == '__main__':
#     app.run(port=4000)


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

# Load environment variables
load_dotenv(dotenv_path)

# Initialize AWS client for Amazon Bedrock
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
        # Using the local index to get context relevant to the user message
        context = str(query_engine.query(user_message))
        print(f'########### Context from local index: {context}')

        # Using Llama 70B to generate a response based on the context
        # Example model ID for Llama 70B, adjust as necessary
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
