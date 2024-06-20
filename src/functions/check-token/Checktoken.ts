export const Checktoken = async (value:any) => {
    try {
        const token = value; // Substitua pelo token JWT real
        const response = await fetch('http://localhost:8000/protected', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Falha ao acessar a rota protegida');
        }

        const responseData = await response.json();
        return responseData
      } catch (error) {
        
      }

  };
  