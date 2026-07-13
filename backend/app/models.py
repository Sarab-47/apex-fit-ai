from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, DateTime, func
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    age = Column(Integer)
    weight_kg = Column(Float)
    height_cm = Column(Float)
    gender = Column(String)
    goal = Column(String)
    activity_level = Column(String)
    training_experience_months = Column(Integer)
    days_per_week = Column(Integer)
    meals = relationship("Meal", back_populates="user")
    workout_logs = relationship("WorkoutLog", back_populates="user")

class Meal(Base):
    __tablename__ = "meals"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String)
    calories = Column(Integer)
    protein_g = Column(Float)
    carbs_g = Column(Float)
    fat_g = Column(Float)
    date = Column(Date)
    user = relationship("User", back_populates="meals")

class WorkoutLog(Base):
    __tablename__ = "workout_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    exercise_name = Column(String, index=True)
    logged_at = Column(DateTime, default=func.now())
    target_weight_kg = Column(Float, nullable=True)
    target_reps = Column(Integer, nullable=True)
    actual_weight_kg = Column(Float)
    actual_reps = Column(Integer)
    set_number = Column(Integer)
    difficulty_rating = Column(String)
    user = relationship("User", back_populates="workout_logs")
