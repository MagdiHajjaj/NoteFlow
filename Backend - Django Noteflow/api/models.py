from django.db import models
from django.utils.text import slugify
from django.utils.crypto import get_random_string
from django.contrib.auth.models import User

# Create your models here.
class Note(models.Model):
    category = (('BUSINESS','Business'),('PERSONAL','Personal'),('IMPORTANT','Important'))
    title = models.CharField(max_length =100)
    body = models.TextField()
    slug = models.SlugField(unique=True, blank = True, null = True)
    category = models.CharField(max_length=15, choices=category,default="PERSONAL")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete =models.CASCADE, related_name = "notes")
    def __str__(self):
        return self.title
    def save(self, *args, **kwargs):
        if not self.slug:
            # Generate initial slug
            slug_base = slugify(self.title)
            slug = slug_base
            # Check if the slug is unique and modify it if necessary
            if Note.objects.filter(slug=slug).exists():
                slug = f'{slug_base}-{get_random_string(5)}'
            self.slug = slug
        else:
            # If the title has changed, regenerate the slug
            current_slug = slugify(self.title)
            if current_slug != self.slug:
                self.slug = current_slug
        super(Note, self).save(*args, **kwargs)