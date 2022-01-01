from django.urls import path

from .views import (ConfigurationDetail, ConfigurationList, MicrobotDetail,
                    MicrobotList, SpecificationDetail, SpecificationList)

urlpatterns = [
    path(r'configurations', ConfigurationList.as_view(), name="configurations"),
    path(r'configurations/<int:pk>', ConfigurationDetail.as_view(),
         name="configuration-detail"),

    path(r'specifications', SpecificationList.as_view(), name="specifications"),
    path(r'specifications/<int:pk>', SpecificationDetail.as_view(),
         name="specification-detail"),

    path(r'microbots', MicrobotList.as_view(), name="microbots"),
    path(r'microbots/<int:pk>', MicrobotDetail.as_view(),
         name="microbot-detail"),
]
