from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^users$', views.index, name='users'),
    url(r'^users/new$',views.new, name='new'),
    url(r'^users/(?P<id>\d+)$',views.show_by_id, name='show'),
    url(r'^users/(?P<id>\d+)/edit$',views.edit_by_id, name='edit'),
    url(r'^users/(?P<id>\d+)/destroy$',views.delete_by_id, name='destroy'),
    url(r'^users/create$',views.create, name='create'),
    url(r'^users/update$',views.update, name='update')
]


# Have 7 routes. Because we are working with 'users', they might look like:
#
# GET request to /users
#     - calls the index method to display all the users. This will need a template.
# GET request to /users/new
#     - calls the new method to display a form allowing users to create a new user.
#     This will need a template.
# GET request /users/<id>/edit
#     - calls the edit method to display a form allowing users to edit an existing
#     user with the given id. This will need a template.
# GET /users/<id>
#     - calls the show method to display the info for a particular user with given
#     id. This will need a template.
# POST to /users/create
#     - calls the create method to insert a new user record into our database.
#     This POST should be sent from the form on the page /users/new. Have this r
#     edirect to /users/<id> once created.
# GET /users/<id>/destroy
#     - calls the destroy method to remove a particular user with the given id.
#     Have this redirect back to /users once deleted.
# POST /users/update
#     - calls the update method to process the submitted form sent
#     from /users/<id>/edit. Have this redirect to /users/<id> once updated.
#
# Notice that for every form submission we use a POST method,
# while we're rendering our templates from get routes.
#
