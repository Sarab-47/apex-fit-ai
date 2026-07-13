def calculate_tdee(weight_kg, height_cm, age, gender, activity_level):
    # Mifflin-St Jeor
    if gender.lower() == 'male':
        bmr = (10 * weight_kg) + (6.25 * height_cm) - (5 * age) + 5
    else:
        bmr = (10 * weight_kg) + (6.25 * height_cm) - (5 * age) - 161
    
    # Activity Multipliers
    multipliers = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'active': 1.725,
        'extreme': 1.9
    }
    
    tdee = bmr * multipliers.get(activity_level.lower(), 1.2)
    return round(tdee)

def calculate_macros(weight_kg, age, height_cm, gender, activity_level, goal):
    tdee = calculate_tdee(weight_kg, height_cm, age, gender, activity_level)
    
    if goal == 'lose_fat':
        target_calories = max(1200, tdee - 500) # Floor at 1200
        protein_g = 2 * weight_kg
        carbs_pct = 0.55
        fat_pct = 0.45
    elif goal == 'gain_muscle':
        target_calories = tdee + 300
        protein_g = 2 * weight_kg
        carbs_pct = 0.65
        fat_pct = 0.35
    else: # maintain
        target_calories = tdee
        protein_g = 1.8 * weight_kg
        carbs_pct = 0.60
        fat_pct = 0.40
    
    # Calculate protein calories
    protein_calories = protein_g * 4
    remaining_calories = target_calories - protein_calories
    
    if remaining_calories < 0:
        # Log a warning conceptually (print for now)
        print(f"Warning: Protein calories exceed target calories for goal {goal}")
        carbs_g = 0
        fat_g = 0
    else:
        # Calculate carbs and fat from remaining calories
        carbs_g = (remaining_calories * carbs_pct) / 4
        fat_g = (remaining_calories * fat_pct) / 9
    
    return {
        "protein_g": round(protein_g),
        "carbs_g": round(carbs_g),
        "fat_g": round(fat_g),
        "target_calories": round(target_calories)
    }
