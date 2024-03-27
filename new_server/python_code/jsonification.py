import csv
import json
from collections import defaultdict

# Read the CSV file
with open('downloads/output_final.csv', 'r') as csv_file:
    reader = csv.DictReader(csv_file)

    # Use a defaultdict to accumulate PO numbers for each file
    po_numbers_per_file = defaultdict(set)  # Changed list to set

    for row in reader:
        # Add the PO number to the set of PO numbers for this file
        po_numbers_per_file[row['File Number']].add(row['PO Number'])

# Convert the defaultdict to a regular dictionary and then to a JSON string
# Convert each set to a list in the process
json_data = json.dumps({k: list(v) for k, v in po_numbers_per_file.items()}, indent=4)

print(json_data)
