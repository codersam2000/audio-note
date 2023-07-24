export const baseURL = `http://127.0.0.1:8000/`
function formDataToJson(formData) {
    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });
    return jsonData;
  }

export const getAllNotes = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${baseURL}api/audio-note/notes/`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    return await res.json()
}

export const getMyNotes = async () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const res = await fetch(`${baseURL}api/audio-note/notes/?user=${user.id}`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    return await res.json()
}

// export const getNoteById = async (id) => {
//     const res = await fetch(`${baseURL}api/audio-note/notes/${id}/`, {

//     });
//     return await res.json()
// }

// export const createNote = (note) => {
//     console.log(note)
//     const token = localStorage.getItem('token');
//     fetch(`${baseURL}api/audio-note/notes/`, {
//         method: "POST",
//         headers: {
//             'Content-type': 'application/json',
//             'Authorization': `Token ${token}`
//         },
//         // body: JSON.stringify(
//         //     {
//         //         title : "How to become a freelancer",
//         //         note : "notes",
//         //         voice : "male",
//         //         user_id : "11"
//         //     }
//         //         )
//         body: note
//     })
//     .then(res=>{
//         if(res.ok){
//             return res.json()
//             .then(data=>{
//                 if(data.type === 'success'){
//                     return data.message;
//                 }else{
//                     return 'Something wen wrong'
//                 }
//             })
//         }else{
//             return res.json()
//               .then(responseData => {
//                 return responseData.non_field_errors[0]
//               })
//         }
//     })
//     .catch(err => {
//         return err
//     })
// }

export const createNote = async (note) => {
    const jsonNote = formDataToJson(note)

    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${baseURL}api/audio-note/notes/`, {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(jsonNote) // Convert the note to JSON format
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.type === 'success') {
          return data;
        } else {
          return 'Something went wrong';
        }
      } else {
        const responseData = await response.json();
        return responseData.non_field_errors[0];
      }
    } catch (err) {
      return err;
    }
  };
  

export const removeNote = async (id) => {
    let token = localStorage.getItem('token')
    return await fetch(`${baseURL}api/audio-note/note/delete/${id}/`, {
        method: "DELETE",
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

export const download = async (url, filename) => {
    const data = await fetch(url)
    const blob = await data.blob()
    const objectUrl = URL.createObjectURL(blob)

    const link = document.createElement('a')

    link.setAttribute('href', objectUrl)
    link.setAttribute('download', filename)
    link.style.display = 'none'

    document.body.appendChild(link)
  
    link.click()
  
    document.body.removeChild(link)
}