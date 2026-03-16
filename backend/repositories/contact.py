from core.models import ContactSubmission
from .base import BaseRepository

class ContactRepository(BaseRepository[ContactSubmission]):
    def __init__(self):
        super().__init__(ContactSubmission)

contact_repository = ContactRepository()
