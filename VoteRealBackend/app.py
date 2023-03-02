from flask import Flask
from flask import request

from cdp_backend.database import models as db_models
from cdp_backend.pipeline.transcript_model import Transcript
import fireo
from gcsfs import GCSFileSystem
from google.auth.credentials import AnonymousCredentials
from google.cloud.firestore import Client
import openai
import os 

fireo.connection(client=Client(
    project="cdp-seattle-21723dcf",
    credentials=AnonymousCredentials()
))

app = Flask(__name__)


@app.route('/bills')
def get_bills():
    # Read from the database
    events = list(db_models.Matter.collection.filter('matter_type', 'in', ['Council Bill (CB)', 'Council Budget Action (CBA)']).fetch(10))
    ret = []
    for event in events:
        bill = {}
        bill["name"] = event.name
        

        response = openai.Completion.create(
            model="text-davinci-003",
            prompt="Summarize this orgiance in 4 engaging and sentences each under 20 words. Put <FLAG> at beginning and <FLAG> at end of each:\n\n" + event.title,
            temperature=0.7,
            max_tokens=400,
            api_key="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",
            top_p=1.0,
            frequency_penalty=0.0,
            presence_penalty=0.0
        )

        res = response.choices[0].text.strip()
        res = res.split("<FLAG>")
        summary = []
        i = 0
        while i < len(res):
            if (len(res[i]) > 20):
                summary.append(res[i].strip())
            i += 1

        bill["summary"] = summary
        
        votes_for_event = list(db_models.Vote.collection.filter(matter_ref=event.key).fetch())
        if len(votes_for_event) > 0:
            votes = []
            for vote in votes_for_event:
                voter = {}
                voter["person"] = vote.person_ref.get().name
                voter["decision"] = vote.decision
                votes.append(voter)
            bill["votes"] = votes
        ret.append(bill)
    return ret

