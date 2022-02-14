from django.shortcuts import render

from .configuration.views import (ConfigurationDetail,
                                  ConfigurationEntryDetail,
                                  ConfigurationEntryList, ConfigurationList)
from .microbot.views import MicrobotDetail, MicrobotList
from .specification.views import SpecificationDetail, SpecificationList

# Create your views here.
