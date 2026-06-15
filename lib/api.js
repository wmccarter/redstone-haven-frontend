const API_URL = 'https://redstonehaven.com/index.php?graphql';

export async function getProductData() {
  const query = `
    query AllPosts {
      posts(first: 5) {
        nodes {
          id
          title
          date
        }
      }
    }
  `;

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const json = await res.json();
    
    if (json.errors) {
      console.error('GraphQL Errors:', json.errors);
      return [];
    }

    return json.data?.posts?.nodes || [];
  } catch (error) {
    console.error('Connection failed:', error);
    return [];
  }
}