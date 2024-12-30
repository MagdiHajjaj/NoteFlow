from django.shortcuts import render

from api.models import Note
from api.serializers import NoteSerializer
from rest_framework.response import Response
from django.db.models import Q
from rest_framework.decorators import api_view,permission_classes

from rest_framework import status,generics
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
class CreatedUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Restrict notes to the authenticated user
        return Note.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        # Save the note with the authenticated user as the author
        serializer.save(author=self.request.user)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Restrict delete permissions to the note's author
        return Note.objects.filter(author=self.request.user)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_notes(request):
    query = request.query_params.get("search", "")
    user = request.user
    notes = Note.objects.filter(
        Q(author=user) & 
        (Q(title__icontains=query) | Q(body__icontains=query) | Q(category__icontains=query))
    )
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def notes(request):
    user = request.user

    if request.method == "GET":
        # Fetch only the authenticated user's notes
        notes = Note.objects.filter(author=user)
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        # Create a new note with the authenticated user as the author
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def note_detail(request, slug):
    user = request.user

    try:
        # Ensure the note belongs to the authenticated user
        note = Note.objects.get(slug=slug, author=user)
    except Note.DoesNotExist:
        return Response({"error": "Note not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = NoteSerializer(note)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = NoteSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)