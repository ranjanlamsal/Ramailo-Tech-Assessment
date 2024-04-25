from django.contrib.auth.decorators import login_required
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.permissions import IsAuthenticated


class HomeView(APIView):
    permission_classes = [IsAuthenticated] 
    
    def get(self, request):
        return Response({"success":"Success"},
                status = status.HTTP_200_OK
            )