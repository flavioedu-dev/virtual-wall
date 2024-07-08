export const Checktoken = async (value:any) => {
    try {
        const token = value; // Substitua pelo token JWT real
        const response = await fetch('https://projeto-web-full-stack-pm-devs.onrender.com/protected', {
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
  