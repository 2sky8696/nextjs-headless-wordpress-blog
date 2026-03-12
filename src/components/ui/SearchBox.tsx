"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SearchBox(){
  const [keyword, setKeyword] =useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    router.push(`/news?search=${keyword}`)
  }

  return(
    <form onSubmit={handleSubmit}>
      <input
      type="text"
      placeholder="記事検索"
      value={keyword}
      onChange={(e)=> setKeyword(e.target.value)}
      />
      <button type="submit">検索</button>
    </form>
  )
}