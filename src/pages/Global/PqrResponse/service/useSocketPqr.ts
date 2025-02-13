import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

// Asegúrate de reemplazar esto con tu URL real de ngrok
const SOCKET_URL = 'https://ad06-2800-e2-9c00-398-f9a5-d895-eec8-1501.ngrok-free.app/api/pqr';

export const useSocketPqr = (ids:number[]) => {
   const [socket, setSocket] = useState<Socket | null>(null);
   const [response, setResponse] = useState<any>(null);



  useEffect(() => {
    const socketInstance = io(SOCKET_URL, {
      transports: ['websocket', 'polling'], 
      path: '/socket.io',  
    });

    ids.forEach(prqId => {
      socketInstance.on(`pqr-${prqId}-estado`, (data) => {
        // console.log(data);
        setResponse(data);
      });
    });


    return () => {
      socketInstance.disconnect();
    };
  }, []);
  

  return {
    response,
  };
};


