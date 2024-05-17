const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            posts: [],
            comments: [],
            likes: [],
            suggestions: [],
            message: null,
        },
        actions: {
            // Fetch all posts
            getPosts: async () => {
                try {
                    const response = await fetch('https://psychic-fortnight-5gg54q5jwv67fv9gj-3001.app.github.dev/api/post');
                    const data = await response.json();
                    setStore({ posts: data.img });
                } catch (error) {
                    console.error("Error fetching posts:", error);
                }
            },

            // Create a new post
            createPost: async (img, bodytext) => {
                try {
                    const response = await fetch('https://psychic-fortnight-5gg54q5jwv67fv9gj-3001.app.github.dev/api/post', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ img, bodytext })
                    });
                    const data = await response.json();
                    getActions().getPosts(); // Refresh posts
                    setStore({ message: data.msg });
                } catch (error) {
                    console.error("Error creating post:", error);
                }
            },

            // Update a post
            updatePost: async (postId, img, bodytext) => {
                try {
                    const response = await fetch(`https://psychic-fortnight-5gg54q5jwv67fv9gj-3001.app.github.dev/api/post/${postId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ img, bodytext })
                    });
                    const data = await response.json();
                    getActions().getPosts(); // Refresh posts
                    setStore({ message: data.msg });
                } catch (error) {
                    console.error("Error updating post:", error);
                }
            },

            // Delete a post
            deletePost: async (postId) => {
                try {
                    const response = await fetch(`https://psychic-fortnight-5gg54q5jwv67fv9gj-3001.app.github.dev/api/post/${postId}`, {
                        method: 'DELETE'
                    });
                    const data = await response.json();
                    getActions().getPosts(); // Refresh posts
                    setStore({ message: data.msg });
                } catch (error) {
                    console.error("Error deleting post:", error);
                }
            },

            // Fetch all suggestions
            getSuggestions: async () => {
                try {
                    const response = await fetch('https://psychic-fortnight-5gg54q5jwv67fv9gj-3001.app.github.dev/api/suggestion');
                    const data = await response.json();
                    setStore({ suggestions: data.suggestion });
                } catch (error) {
                    console.error("Error fetching suggestions:", error);
                }
            },

            // Create a new suggestion
            createSuggestion: async (suggestion) => {
                try {
                    const response = await fetch('https://psychic-fortnight-5gg54q5jwv67fv9gj-3001.app.github.dev/api/suggestion', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ suggestion })
                    });
                    const data = await response.json();
                    getActions().getSuggestions(); // Refresh suggestions
                    setStore({ message: data.msg });
                } catch (error) {
                    console.error("Error creating suggestion:", error);
                }
            },

            // Other actions can be added here for handling comments, likes, etc.
        }
    };
};

export default getState;
