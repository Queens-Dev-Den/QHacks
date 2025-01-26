import axios from 'axios';

const API_URL = 'http://localhost:3000/api/nutrients';

export const getNutrients = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching nutrients:', error);
    throw error;
  }
};

export const createNutrient = async (nutrientData) => {
  try {
    const response = await axios.post(API_URL, nutrientData);
    return response.data;
  } catch (error) {
    console.error('Error creating nutrient:', error);
    throw error;
  }
};

export const updateNutrient = async (id, nutrientData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, nutrientData);
    return response.data;
  } catch (error) {
    console.error('Error updating nutrient:', error);
    throw error;
  }
};

export const deleteNutrient = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting nutrient:', error);
    throw error;
  }
};