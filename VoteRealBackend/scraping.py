from cdp_backend.database import models as db_models
from cdp_backend.pipeline.transcript_model import Transcript
import fireo
from gcsfs import GCSFileSystem
from google.auth.credentials import AnonymousCredentials
from google.cloud.firestore import Client

from cdp_scrapers.legistar_utils import get_legistar_person
from cdp_scrapers.instances import get_seattle_events
from datetime import datetime
import openai
import os 


import requests
import tempfile
import pdfplumber
import docx2txt
import re


# Connect to the database
fireo.connection(client=Client(
    project="cdp-seattle-21723dcf",
    credentials=AnonymousCredentials()
))

council_members = list(db_models.Person.collection.fetch())

for council_member in council_members:
    print(council_member.__dict__)
# seattle_cdp_parsed_events = get_seattle_events(
#     from_dt=datetime(2023, 1, 1),
#     to_dt=datetime(2023, 1, 10),
# )

# for event in seattle_cdp_parsed_events:
#     small = event.event_minutes_items[0:5]
#     for item in small:
#         matter = item.matter
#         if matter and item.votes:
#             summary = str(matter.title)
#             response = openai.Completion.create(
#                 model="text-curie-001",
#                 prompt="Summarize this bill in engaging and informative sentences each under 20 words. Put FLAG at the start of each sentence" + summary,
#                 temperature=0.7,
#                 max_tokens=300,
#                 api_key="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",
#                 top_p=1.0,
#                 frequency_penalty=0.0,
#                 presence_penalty=0.0
#             )
#             res = response.choices[0].text.strip()
#             res = res.split(".")
#             # res = re.split(r"\s*\S*FLAG\S*\s*", res)
#             summary = []
#             i = 0
#             while i < len(res):
#                 if (len(res[i]) > 20):
#                     summary.append(res[i].strip())
#                 i += 1
                
#             print("NAME:", str(matter.name))
#             print("SUMMARY:", summary)
#             print("DECISION:", str(item.decision))
#             print("**************************")
#             for vote in item.votes:
#                 print("NAME:", str(vote.person.name))
#                 print("VOTE:", str(vote.decision))
#                 print("----------------------------")


# # CHATGPT SUMMARY INTO SHORT SENTENCES 






# def parse_file(url, type): 
#     if type == "pdf":
#         try:
#             r = requests.get(file_url, stream = True)
#             with open("temp.pdf","wb") as temp:
#                 for chunk in r.iter_content(chunk_size=1024):
#                     if chunk:
#                         temp.write(chunk)
            
#             with pdfplumber.open(r'temp.pdf') as pdf:
#                 extracted_text = ""
#                 for i in range(max(4, len(pdf.pages))):
#                     extracted_page = pdf.pages[1]
#                     extracted_text += extracted_page.extract_text() + " "


#                 # Generate Summary                
#                 return (' '.join(extracted_text.split()))[0:5000]
#         except:
#             return None 
#     else:
#         try:
#             r = requests.get(file_url, stream = True)
#             with open("temp.docx","wb") as temp:
#                 for chunk in r.iter_content(chunk_size=1024):
#                     if chunk:
#                         temp.write(chunk)
            
#             extracted_text = docx2txt.process("temp.docx")                
#             return (' '.join(extracted_text.split()))[0:5000]
#         except:
#             return None
#     return None
