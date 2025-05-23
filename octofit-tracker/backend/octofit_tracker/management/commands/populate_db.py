from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.conf import settings
from pymongo import MongoClient
from datetime import timedelta
from bson import ObjectId

class Command(BaseCommand):
    help = 'Populate the database with test data for users, teams, activity, leaderboard, and workouts'

    def handle(self, *args, **kwargs):
        # Conectar ao MongoDB
        client = MongoClient(settings.DATABASES['default']['HOST'], settings.DATABASES['default']['PORT'])
        db = client[settings.DATABASES['default']['NAME']]

        # Limpar coleções existentes
        db.users.drop()
        db.teams.drop()
        db.activity.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Criar usuários
        users = [
            {"_id": ObjectId(), "username": "thundergod", "email": "thundergod@mhigh.edu", "password": "thundergodpassword"},
            {"_id": ObjectId(), "username": "metalgeek", "email": "metalgeek@mhigh.edu", "password": "metalgeekpassword"},
            {"_id": ObjectId(), "username": "zerocool", "email": "zerocool@mhigh.edu", "password": "zerocoolpassword"},
            {"_id": ObjectId(), "username": "crashoverride", "email": "crashoverride@hmhigh.edu", "password": "crashoverridepassword"},
            {"_id": ObjectId(), "username": "sleeptoken", "email": "sleeptoken@mhigh.edu", "password": "sleeptokenpassword"},
        ]
        db.users.insert_many(users)

        # Criar times
        blue_team = {"_id": ObjectId(), "name": "Blue Team", "members": [user["_id"] for user in users]}
        gold_team = {"_id": ObjectId(), "name": "Gold Team", "members": [user["_id"] for user in users]}
        db.teams.insert_many([blue_team, gold_team])

        # Criar atividades
        activities = [
            {"_id": ObjectId(), "user": users[0]["_id"], "activity_type": "Cycling", "duration": 60*60},
            {"_id": ObjectId(), "user": users[1]["_id"], "activity_type": "Crossfit", "duration": 2*60*60},
            {"_id": ObjectId(), "user": users[2]["_id"], "activity_type": "Running", "duration": 1*60*60+30*60},
            {"_id": ObjectId(), "user": users[3]["_id"], "activity_type": "Strength", "duration": 30*60},
            {"_id": ObjectId(), "user": users[4]["_id"], "activity_type": "Swimming", "duration": 1*60*60+15*60},
        ]
        db.activity.insert_many(activities)

        # Criar entradas de leaderboard
        leaderboard_entries = [
            {"_id": ObjectId(), "user": users[0]["_id"], "score": 100},
            {"_id": ObjectId(), "user": users[1]["_id"], "score": 90},
            {"_id": ObjectId(), "user": users[2]["_id"], "score": 95},
            {"_id": ObjectId(), "user": users[3]["_id"], "score": 85},
            {"_id": ObjectId(), "user": users[4]["_id"], "score": 80},
        ]
        db.leaderboard.insert_many(leaderboard_entries)

        # Criar treinos
        workouts = [
            {"_id": ObjectId(), "name": "Cycling Training", "description": "Training for a road cycling event"},
            {"_id": ObjectId(), "name": "Crossfit", "description": "Training for a crossfit competition"},
            {"_id": ObjectId(), "name": "Running Training", "description": "Training for a marathon"},
            {"_id": ObjectId(), "name": "Strength Training", "description": "Training for strength"},
            {"_id": ObjectId(), "name": "Swimming Training", "description": "Training for a swimming competition"},
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with test data (directly via PyMongo).'))
