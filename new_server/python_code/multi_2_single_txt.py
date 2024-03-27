import os

# Specify the directory containing your text files
text_directory = 'clean_text'

# Specify the output file
output_file_path = 'FINAL_TXT/final_output.txt'

# Make sure the output directory exists
os.makedirs(os.path.dirname(output_file_path), exist_ok=True)

# Find all text files in the specified directory
text_files = [f for f in os.listdir(text_directory) if f.endswith('.txt')]

# Open the output file
with open(output_file_path, 'w') as output_file:
    # Iterate over each text file
    for text_file in text_files:
        # Open the text file
        with open(os.path.join(text_directory, text_file), 'r') as input_file:
            # Write the contents of the text file to the output file
            output_file.write(input_file.read())
            # Optionally, add a newline character after each file to separate them
            output_file.write('\n')
