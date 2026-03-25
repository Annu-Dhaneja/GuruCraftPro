import os
import sys
import json

# Add the current directory to sys.path to allow imports from core
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from core.database import SessionLocal
from core.models import Media, ContentBlock, Post

def migrate_db_images():
    db = SessionLocal()
    try:
        print("Migrating Media table image paths...")
        media_items = db.query(Media).filter(Media.file_url.like('%/img/%')).all()
        for item in media_items:
            old_url = item.file_url
            item.file_url = old_url.replace('/img/', '/images/')
            print(f"  Updated Media {item.id}: {old_url} -> {item.file_url}")
        
        print("\nMigrating ContentBlock values...")
        blocks = db.query(ContentBlock).filter(ContentBlock.value.like('%/img/%')).all()
        for block in blocks:
            old_val = block.value
            block.value = old_val.replace('/img/', '/images/')
            print(f"  Updated ContentBlock {block.id} (key: {block.key})")

        print("\nMigrating Post content...")
        posts = db.query(Post).filter(Post.content.like('%/img/%')).all()
        for post in posts:
            old_content = post.content
            post.content = old_content.replace('/img/', '/images/')
            print(f"  Updated Post {post.id} (slug: {post.slug})")
        
        db.commit()
        print("\nDatabase migration complete!")
    except Exception as e:
        db.rollback()
        print(f"Error during database migration: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    migrate_db_images()
