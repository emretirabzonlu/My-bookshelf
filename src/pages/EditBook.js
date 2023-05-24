import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/acitonTypes";



const EditBook = () => {
    const params = useParams()
    const { booksState, categoriesState } = useSelector(state => state)
    const myBook = booksState.books.find(item => item.id === params.bookId)
    const [form, setForm] = useState(myBook)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (event)=>{
        event.preventDefault()
        //validation
        if (form.name === "" || form.price === "" || form.author === "") {
            alert("Boş bırakılan yerleri lütfen doldurunuz !!")
            return
        }

        api.put(`${urls.books}/${params.bookId}`, form)
        .then((res)=>{
            dispatch({type:actionTypes.bookActions.EDİT_BOOK, payload : form})
            navigate("/")
            
        })
        .catch((err)=>{})
    } 
    
    return (
        <div>
            <Header />
            <div className="container my-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Kitap Adı</label>
                        <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} type="text" className="form-control" id="name" placeholder="Yalnızız" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="author" className="form-label">Yazar</label>
                        <input value={form.author} onChange={(event) => setForm({ ...form, author: event.target.value })} type="text" className="form-control" id="author" placeholder="Peyami Safa" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="publisher" className="form-label">Yayın Evi</label>
                        <input value={form.publisher} onChange={(event) => setForm({ ...form, publisher: event.target.value })} type="text" className="form-control" id="publisher" placeholder="Ötüken" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="isbn" className="form-label">ISBN</label>
                        <input value={form.isbn} onChange={(event) => setForm({ ...form, isbn: event.target.value })} type="number" className="form-control" id="isbn" placeholder="9878794569" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Fiyatı</label>
                        <input value={form.price} onChange={(event) => setForm({ ...form, price: Number(event.target.value) })} type="number" className="form-control" id="price" placeholder="69.70" />
                    </div>

                    { <select value={form.categoryId} onChange={(event) => setForm({ ...form, categoryId: event.target.value })} className="form-select">
                        {
                            categoriesState.categories.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            )

                            )
                        }
                    </select> }

                    <div className="d-flex justify-content-center my-5">
                        <button className="btn btn-warning w-50" type="submit">Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditBook