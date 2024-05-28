
document.getElementById('shorten-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const originalUrl = document.getElementById('original-url').value;
  
    try {
      const response = await fetch('http://localhost:5000/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl }),
      });
      
      const data = await response.json();
  
      if (response.ok) {
        const resultDiv = document.getElementById('result');
        resultDiv.style.display = 'block';
        resultDiv.textContent = `Shortened URL: ${`http://localhost:5000`}/${data.shortUrl}`;
      } else {
        alert('Failed to shorten URL: ' + data.errors[0].msg);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  });
  
  document.getElementById('redirect-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const shortUrl = document.getElementById('short-url').value;
  
    try {
      const shortUrlPath = new URL(shortUrl, window.location.origin).pathname;
  
      window.location.href = `http://localhost:5000${shortUrlPath}`;
    } catch (error) {
      const resultDiv = document.getElementById('redirect-result');
      resultDiv.style.display = 'block';
      resultDiv.textContent = 'Error: ' + error.message;
    }
  });