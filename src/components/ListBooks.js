import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../assets/styles/buttons.css"
import actionTypes from "../redux/actions/acitonTypes";
import api from "../api/api";
import urls from "../api/urls";
import CustomModal from "./CustomModal";
import { Link } from "react-router-dom";
import { upperFirstLetters } from "../utils/functions";

const ListBooks = () => {
    const dispatch = useDispatch()
    const { booksState, categoriesState } = useSelector(state => state)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [willDeleteBook, setWillDeleteBook] = useState("");
    const [searchText,setSearchText] = useState("");
    const [filteredBooks, setFilteredBooks] = useState(booksState.books);

    
    useEffect(()=>{
        console.log(searchText);
         const temp = booksState.books.filter((item)=>item.name.toLowerCase().includes(searchText.toLowerCase()))
        setFilteredBooks(temp)
    },[searchText,booksState.books])
    
    const deleteBook = (id) => {
        dispatch({ type: actionTypes.bookActions.DELETE_BOOK_START })
        api.delete(`${urls.books}/${id}`)
            .then((res) => {
                dispatch({ type: actionTypes.bookActions.DELETE_BOOK_SUCCESS, payload: id })
            })
            .catch((err) => {
                dispatch({ type: actionTypes.bookActions_FAIL.DELETE_BOOK, payload: "Silinirken bir hata oluştu" })
            })

    }
    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between mb-5">
                <input
                 value={searchText} 
                 onChange={(event)=>setSearchText(event.target.value)} 
                 className="form-control w-75" 
                 type="text" 
                 placeholder="Aramak istediğiniz kitabın ismini yazınız..." 
                 />
                
                {
                    categoriesState.categories.length === 0 ? (<Link to={"/add-category"}>Önce Kategori Eklenmeli</Link>) : (<Link to={"/add-book"} className="btn btn-warning">Kitap Ekle</Link>)
                }
            </div>
            <table className="table table-striped ">
                <thead>
                    <tr>
                        <th scope="col">Sıra No</th>
                        <th scope="col">Adı</th>
                        <th scope="col">Yazar</th>
                        <th scope="col">Kategori</th>
                        <th scope="col">İşlemler</th>
                    </tr>
                </thead>
                <tbody>

                    {filteredBooks.map((book, index) => {
                        const myCategory = categoriesState.categories.find(item => item.id === book.categoryId)
                        return (
                            <tr key={book.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{upperFirstLetters(book.name)}</td>
                                <td>{book.author}</td>
                                <td>{myCategory.name}</td>
                                <td>
                                    <button onClick={() => {
                                        setShowDeleteModal(true)
                                        setWillDeleteBook(book.id)

                                    }} className="generalBtn deleteBtn">Sil</button>
                                    <Link to={`/edit-book/${book.id}`} className="generalBtn editBtn">Güncelle</Link>
                                    <Link to={`/book-detail/${book.id}`} className="generalBtn ">Detay</Link>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
            {
                showDeleteModal === true && (
                    <CustomModal onConfirm={() => {
                        deleteBook(willDeleteBook)
                        setShowDeleteModal(false)
                    }}
                        onCancel={() => setShowDeleteModal(false)}
                        title="SİLME"
                        message="Silmek istediğinize emin misiniz?" />
                )
            }
        </div>
    )
}

export default ListBooks