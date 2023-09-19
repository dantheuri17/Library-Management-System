// apiService.js

export async function fetchData() {
	try {
		const response = await fetch("http://127.0.0.1:3000/");
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.json();
	} catch (error) {
		throw new Error("Failed to fetch data");
	}
}

