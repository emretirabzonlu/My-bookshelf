import React, { useState, useEffect } from "react";

import Header from "../components/Header"
import { useParams } from "react-router-dom";
import api from "../api/api";
import urls from "../api/urls";
import { Link } from "react-router-dom";

const BookDetail = () => {
    const params = useParams()
    const [myBook, setMyBook] = useState(null)
    const [bookCategory, setBookCategory] = useState(null)

    useEffect(() => {
        api.get(`${urls.books}/${params.bookId}`)
            .then((resBook) => {
                setMyBook(resBook.data)
                api.get(`${urls.categories}/${resBook.data.categoryId}`)
                    .then((resCategory) => {
                        setBookCategory(resCategory.data)
                    })
                    .catch((errCategory) => { })
            })
            .catch((errBook) => { })
    }, [])

    if (myBook === null || bookCategory == null) return null

    return (
        <div>
            <Header />
            <div className="list-comp container my-5">
                <h3><span>Kitap Adı</span> : {myBook.name}</h3>
                <h3><span>Yazarı</span> : {myBook.author}</h3>
                <h3><span>Fiyatı</span>: {myBook.price} &#8378;</h3>
                <h3><span>Yayın Evi</span> : {myBook.publisher}</h3>
                <h3><span>ISBN</span>: {myBook.isbn}</h3>
                <h3><span>Kategori</span> : {bookCategory.name}</h3>
                <Link to={"/"}>Geri</Link>
            </div>
        </div>

    )
}

export default BookDetail