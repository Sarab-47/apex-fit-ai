'use client';

import { useState } from 'react';

type OnboardingData = {
  email: string;
  password: string;
  age: number | '';
  weight_kg: number | '';
  height_cm: number | '';
  gender: 'male' | 'female' | '';
  goal: string;
  activity_level: string;
  training_experience_months: number | '';
  days_per_week: number | '';
};

export default function SignupSteps() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<OnboardingData>({
    email: '',
    password: '',
    age: '',
    weight_kg: '',
    height_cm: '',
    gender: '',
    goal: 'maintain',
    activity_level: 'sedentary',
    training_experience_months: '',
    days_per_week: '',
  });

  const handleUpdate = (field: keyof OnboardingData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    const { email, password, age, weight_kg, height_cm, gender } = formData;
    if (!email || !password || age === '' || weight_kg === '' || height_cm === '' || !gender) {
      alert('All fields are required.');
      return false;
    }
    if (password.length > 72) {
      alert('Password must be 72 characters or less.');
      return false;
    }
    if (typeof age !== 'number' || age < 13 || age > 100) {
      alert('Please enter a valid age (13-100).');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const { training_experience_months, days_per_week } = formData;
    if (training_experience_months === '' || days_per_week === '') {
      alert('All fields are required.');
      return false;
    }
    if (typeof training_experience_months !== 'number' || training_experience_months < 0) {
      alert('Experience must be 0 or greater.');
      return false;
    }
    if (typeof days_per_week !== 'number' || days_per_week < 1 || days_per_week > 7) {
      alert('Days per week must be between 1 and 7.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        window.location.href = '/dashboard';
      } else {
        const err = await res.json();
        alert(err.error || 'Signup failed');
      }
    } catch (error) {
      alert('Something went wrong, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 1) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Step 1: Basic Info</h2>
        <input type="email" placeholder="Email" value={formData.email} className="border p-2" onChange={(e) => handleUpdate('email', e.target.value)} />
        <input type="password" placeholder="Password" maxLength={72} value={formData.password} className="border p-2" onChange={(e) => handleUpdate('password', e.target.value)} />
        <input type="number" placeholder="Age" value={formData.age} className="border p-2" onChange={(e) => handleUpdate('age', e.target.value === '' ? '' : parseInt(e.target.value))} />
        <input type="number" placeholder="Weight (kg)" value={formData.weight_kg} className="border p-2" onChange={(e) => handleUpdate('weight_kg', e.target.value === '' ? '' : parseFloat(e.target.value))} />
        <input type="number" placeholder="Height (cm)" value={formData.height_cm} className="border p-2" onChange={(e) => handleUpdate('height_cm', e.target.value === '' ? '' : parseFloat(e.target.value))} />
        <select className="border p-2" value={formData.gender} onChange={(e) => handleUpdate('gender', e.target.value)}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button 
          onClick={() => validateStep1() && setStep(2)}
          className="bg-black text-white p-2 mt-4"
        >
          Next
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Step 2: Goals & Experience</h2>
      <select className="border p-2" value={formData.goal} onChange={(e) => handleUpdate('goal', e.target.value)}>
        <option value="lose_fat">Lose Fat</option>
        <option value="maintain">Maintain</option>
        <option value="gain_muscle">Gain Muscle</option>
      </select>
      <select className="border p-2" value={formData.activity_level} onChange={(e) => handleUpdate('activity_level', e.target.value)}>
        <option value="sedentary">Sedentary</option>
        <option value="light">Lightly Active</option>
        <option value="moderate">Moderately Active</option>
        <option value="active">Active</option>
        <option value="extreme">Extremely Active</option>
      </select>
      <input type="number" placeholder="Training Experience (months)" value={formData.training_experience_months} className="border p-2" onChange={(e) => handleUpdate('training_experience_months', e.target.value === '' ? '' : parseInt(e.target.value))} />
      <input type="number" placeholder="Days per week available" value={formData.days_per_week} className="border p-2" onChange={(e) => handleUpdate('days_per_week', e.target.value === '' ? '' : parseInt(e.target.value))} />
      <div className="flex gap-4 mt-4">
        <button onClick={() => setStep(1)} className="flex-1 bg-gray-200 p-2" disabled={isSubmitting}>Back</button>
        <button onClick={handleSubmit} className="flex-1 bg-black text-white p-2" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
      </div>
    </div>
  );
}
