import os
import json


def jsonify_text_files_in_folder(folder_path, output_json_path):
    # Dictionary to store filename: content pairs
    json_data = {}

    # Walk through the folder and get all .txt files
    for root, _, files in os.walk(folder_path):
        for file in files:
            if file.endswith(".txt"):
                file_path = os.path.join(root, file)

                # Read the content of the file
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Store the content in the dictionary with the filename as the key
                json_data[file] = content

    # Save the dictionary as a JSON file
    with open(output_json_path, 'w', encoding='utf-8') as json_file:
        json.dump(json_data, json_file, ensure_ascii=False, indent=4)


folder_path = 'clean_text'  # replace with your folder path
output_json_path = 'json_out/output.json'
jsonify_text_files_in_folder(folder_path, output_json_path)
