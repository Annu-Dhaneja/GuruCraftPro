import os
import re
import shutil

# Paths
FRONTEND_DIR = r"e:\Project\virtual_try-main\frontend"
COMPONENTS_DIR = os.path.join(FRONTEND_DIR, "components")
SECTIONS_DIR = os.path.join(COMPONENTS_DIR, "sections")

# Folders to move to components/sections/
FOLDERS_TO_MOVE = [
    "about", "ai", "auth", "booking", "consultation", "contact", "dashboard",
    "faq", "footer", "guruji-art", "guruji-darshan", "home", "portfolio",
    "portfolio-category", "request", "resources", "services", "shop", "team",
    "wardrobe", "wedding"
]

def resolve_relative_import(file_path, import_path):
    """
    Resolves a relative import path relative to the file_path.
    Returns the absolute path (from the filesystem) of the target.
    """
    file_dir = os.path.dirname(file_path)
    abs_target = os.path.abspath(os.path.join(file_dir, import_path))
    return abs_target

def convert_to_absolute_import(file_path, import_path):
    """
    If a relative import points outside the component's folder, 
    converts it to a clean `@/components/...` absolute import.
    """
    # Find which folder under components this file belongs to
    rel_to_components = os.path.relpath(file_path, COMPONENTS_DIR)
    parts = rel_to_components.split(os.sep)
    if not parts or parts[0] in [".", ".."]:
        return import_path # Not under components

    component_root_name = parts[0]
    component_root_dir = os.path.join(COMPONENTS_DIR, component_root_name)

    # Resolve the import path
    abs_target = resolve_relative_import(file_path, import_path)
    
    # Check if the target is outside the component's root folder
    if not abs_target.startswith(component_root_dir + os.sep) and abs_target != component_root_dir:
        # It points outside! Let's convert it to absolute
        if abs_target.startswith(COMPONENTS_DIR):
            rel_target = os.path.relpath(abs_target, FRONTEND_DIR).replace(os.sep, "/")
            # Format as @/components/...
            return "@/" + rel_target
    return import_path

def rewrite_imports_in_file(file_path):
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    modified = False

    # 1. Resolve relative imports pointing outside their directories
    # Regex to match imports: import ... from "relative_path" or require("relative_path")
    import_regex = re.compile(r'(from|import|require\()\s*["\'](\..*?)["\']')

    def replace_relative(match):
        nonlocal modified
        prefix = match.group(1)
        import_path = match.group(2)
        new_path = convert_to_absolute_import(file_path, import_path)
        if new_path != import_path:
            modified = True
            return f'{prefix} "{new_path}"'
        return match.group(0)

    content = import_regex.sub(replace_relative, content)

    # 2. Update absolute imports of the moved folders:
    # E.g., @/components/about/AboutHero -> @/components/sections/about/AboutHero
    for folder in FOLDERS_TO_MOVE:
        pattern = r'@/components/' + re.escape(folder) + r'(/|["\'])'
        replacement = r'@/components/sections/' + folder + r'\1'
        new_content = re.sub(pattern, replacement, content)
        if new_content != content:
            content = new_content
            modified = True

    if modified:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  Rewrote imports in: {os.path.relpath(file_path, FRONTEND_DIR)}")

def main():
    print("Step 1: Creating 'components/sections' directory...")
    os.makedirs(SECTIONS_DIR, exist_ok=True)

    print("Step 2: Processing and rewriting imports in ALL source files...")
    for root, _, files in os.walk(FRONTEND_DIR):
        # Skip node_modules and .next
        if "node_modules" in root or ".next" in root or ".git" in root:
            continue
        for file in files:
            if file.endswith((".ts", ".tsx", ".js", ".jsx")):
                rewrite_imports_in_file(os.path.join(root, file))

    print("Step 3: Physically moving the component folders into components/sections/...")
    for folder in FOLDERS_TO_MOVE:
        src = os.path.join(COMPONENTS_DIR, folder)
        dest = os.path.join(SECTIONS_DIR, folder)
        if os.path.exists(src) and src != SECTIONS_DIR:
            if os.path.exists(dest):
                print(f"  Warning: Destination {dest} already exists! Skipping physical move.")
            else:
                shutil.move(src, dest)
                print(f"  Moved: components/{folder} -> components/sections/{folder}")

    print("\nRefactoring Completed Successfully!")

if __name__ == "__main__":
    main()
