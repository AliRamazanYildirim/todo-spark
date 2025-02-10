export const apiRequest = async (url, method, data) => {
  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};