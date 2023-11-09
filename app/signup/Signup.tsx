// components/SignUpForm.tsx
// ... (previous code)
'use client'
export const SignUpForm: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle form submission logic here
    };
  
    return (
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded"
            placeholder="john.doe@example.com"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input type="password" id="password" className="w-full p-2 border rounded" />
        </div>
        {/* Add more form fields as needed */}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
    );
  };
  
  // ... (export statement)
