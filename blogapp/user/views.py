from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class UserRegistration(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the username is already taken
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already taken."}, status=status.HTTP_400_BAD_REQUEST)

        # Create the user
        user = User.objects.create_user(username=username, password=password)

        if user:
            # Create a token for the user
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Failed to register user."}, status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)

        if user:
            # Create or retrieve token for the user
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)
