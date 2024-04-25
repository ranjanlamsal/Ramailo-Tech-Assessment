from django.urls import path

from . import views

urlpatterns = [
    path('get/<int:id>/', views.SinglePostView.as_view(),  name='single-post'),
    path('get_post/', views.Post_list_view, name = 'Post_List'),
    path('create_post/', views.Post_create_view, name = 'Post_create'),
    path('update_post/<int:id>/', views.Post_update_view, name='Post_update'), 
]