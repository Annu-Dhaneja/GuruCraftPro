import os

def replace_in_files(target_dir, old_text, new_text, extensions=['.tsx', '.ts', '.py', '.json', '.md']):
    for root, dirs, files in os.walk(target_dir):
        if '.next' in root or 'node_modules' in root or '.git' in root:
            continue
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    if old_text in content:
                        print(f"Replacing in {file_path}")
                        new_content = content.replace(old_text, new_text)
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

if __name__ == "__main__":
    replace_in_files('.', 'GurucraftPro', 'GurucraftPro')
    replace_in_files('.', 'GurucraftPro', 'GurucraftPro')
    replace_in_files('.', 'GurucraftPro ', 'GurucraftPro ') # With space to avoid replacing words like "annual"
