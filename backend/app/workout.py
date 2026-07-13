import copy
from .data.exercises import EXERCISES
from . import models
from sqlalchemy.orm import Session
from datetime import date

def get_workout_recommendation(experience_months: int, days_per_week: int):
    # Tier 1: Beginner (0-6 months) -> Full Body, 3 days
    if experience_months <= 6:
        return {
            "split": "Full Body",
            "schedule": [{"day": "Full Body", "exercises": copy.deepcopy(EXERCISES["full_body"])}]
        }
    
    # Tier 2: Intermediate (6-18 months)
    elif experience_months <= 18:
        if days_per_week < 4:
            return {
                "split": "Full Body",
                "schedule": [{"day": "Full Body", "exercises": copy.deepcopy(EXERCISES["full_body"])}]
            }
        else:
            return {
                "split": "Push/Pull/Legs (Intermediate)",
                "schedule": [
                    {"day": "Push (Chest/Shoulders)", "exercises": copy.deepcopy(EXERCISES["chest"] + EXERCISES["shoulders_arms"][:2])},
                    {"day": "Pull (Back/Biceps)", "exercises": copy.deepcopy(EXERCISES["back"] + EXERCISES["shoulders_arms"][2:3])},
                    {"day": "Legs", "exercises": copy.deepcopy(EXERCISES["legs"])}
                ]
            }
            
    # Tier 3: Advanced (18-36 months) -> PPL, 4-6 days, higher volume
    elif experience_months <= 36:
        # PPL with added exercise for volume
        ppl_schedule = [
            {"day": "Push (Chest/Shoulders)", "exercises": copy.deepcopy(EXERCISES["chest"] + EXERCISES["shoulders_arms"][:2])},
            {"day": "Pull (Back/Biceps)", "exercises": copy.deepcopy(EXERCISES["back"] + EXERCISES["shoulders_arms"][2:3])},
            {"day": "Legs", "exercises": copy.deepcopy(EXERCISES["legs"])}
        ]
        # Increase volume by adding one set to each exercise
        for day in ppl_schedule:
            for ex in day["exercises"]:
                ex["sets_reps"] = ex["sets_reps"].replace("3 sets", "4 sets")
        
        return {
            "split": "Push/Pull/Legs (Advanced)",
            "schedule": ppl_schedule
        }
        
    # Tier 4: Pro/Elite (36+ months)
    else:
        if days_per_week >= 6:
            return {
                "split": "Arnold Split (Pro)",
                "schedule": [
                    {"day": "Chest/Back", "exercises": copy.deepcopy(EXERCISES["chest"] + EXERCISES["back"])},
                    {"day": "Shoulders/Arms", "exercises": copy.deepcopy(EXERCISES["shoulders_arms"])},
                    {"day": "Legs", "exercises": copy.deepcopy(EXERCISES["legs"])}
                ]
            }
        else:
            return {
                "split": "Push/Pull/Legs (Advanced)",
                "schedule": [
                    {"day": "Push", "exercises": copy.deepcopy(EXERCISES["chest"] + EXERCISES["shoulders_arms"][:2])},
                    {"day": "Pull", "exercises": copy.deepcopy(EXERCISES["back"] + EXERCISES["shoulders_arms"][2:3])},
                    {"day": "Legs", "exercises": copy.deepcopy(EXERCISES["legs"])}
                ]
            }

def get_todays_focus_day_index(user_id: int, db: Session, schedule: list):
    # Get the most recent log
    last_log = db.query(models.WorkoutLog).filter(
        models.WorkoutLog.user_id == user_id
    ).order_by(models.WorkoutLog.logged_at.desc()).first()

    if not last_log:
        return 0

    # Try to find the day index of the last logged exercise
    last_day_index = -1
    for i, day in enumerate(schedule):
        if any(ex['exercise_name'] == last_log.exercise_name for ex in day['exercises']):
            last_day_index = i
            break
            
    # If exercise not found in current schedule (e.g., split change), fallback to 0
    if last_day_index == -1:
        return 0

    # If logged today, show that day
    if last_log.logged_at.date() == date.today():
        return last_day_index
        
    # If logged yesterday or earlier, show next day (or 0 if last was last)
    return (last_day_index + 1) % len(schedule)
