import os

components_dir = r"e:\Project\virtual_try-main\frontend\components"
out_file = r"e:\Project\virtual_try-main\scratch\components_list.txt"

os.makedirs(os.path.dirname(out_file), exist_ok=True)

with open(out_file, "w", encoding="utf-8") as f:
    for root, dirs, files in os.walk(components_dir):
        rel_path = os.path.relpath(root, components_dir)
        if rel_path == ".":
            rel_path = "root"
        f.write(f"\n[{rel_path}]\n")
        for file in files:
            f.write(f"  - {file} ({os.path.getsize(os.path.join(root, file))} bytes)\n")

print("Done! Component listing saved to scratch/components_list.txt")
