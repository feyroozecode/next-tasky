import Link from 'next/link';

// fetch all notes
async function getNotes() {
    const baseUrl = 'http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30';
    const res = await fetch(baseUrl, {cachr: 'no-store'})
    const data = await res.json()

    data?.items.map((item) => {
        console.table(item);
        
    })
    
    return data?.items as any[];
}

export default async function NotesPage(){
    const notes = await getNotes();

    return (
        <div>
            <h1>Notes</h1>

            <div>
                {notes?.map((note) => {
                        return <Note key={note.id} note={note} />;
                    }
                )}
            </div>
            
        </div>
    );
}

function Note({note}: any){
    const {id, title, content, created} = note || {};

    return (
        <Link href={`/notes/${id}`}>
            <div>
                <h2>{title}</h2>
                <p>{content}</p>
                <p>{created}</p>
            </div>
        </Link>
    );
}