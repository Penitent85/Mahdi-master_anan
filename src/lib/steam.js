'use server'
import { StreamChat } from 'stream-chat';

const serverClient = StreamChat.getInstance('8ghmxrx2v98h', 'a3u9bgzw6qdrdz9383c4sn6nd5kzmb8b8fdyw5wuu227v6f3q8n3wwydfnuvz2vg');

export const token = serverClient.createToken('john');


console.log( 'eeeeeeeeee' )
console.log( 'token',token)