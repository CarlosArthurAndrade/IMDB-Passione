'use client'

import { HttpResponse } from "@/interfaces/utils/httpResponse"

export async function getData<T>(url: string, token?: string) {
    try {
        const response = await fetch(url, {
            headers: { 'Content-Type': 'application/json', 'Authorization': ` Bearer ${token}`},
            method: 'GET',
        })
        const data: HttpResponse<T> = await response.json()
        return data
    } catch(error){
        console.log(error)
    }
}

export async function postData<T>(url: string, body: {}, token?: string) {
    try {
        const response = await fetch(url, {
            headers: { 'Content-Type': 'application/json', 'Authorization': ` Bearer ${token}`},
            method: 'POST',
            body: JSON.stringify(body)
        })
        const data: HttpResponse<T> = await response.json()
        return data
    } catch(error){
        console.log(error)
    }
}

export async function deleteData<T>(url: string, body: {}, token?: string) {
    try {
        const response = await fetch(url, {
            headers: { 'Content-Type': 'application/json', 'Authorization': ` Bearer ${token}`},
            method: 'DELETE',
            body: JSON.stringify(body)
        })
        const data: HttpResponse<T> = await response.json()
        return data
    } catch(error){
        console.log(error)
    }
}

export async function updateData<T>(url: string, body: {}, token?: string) {
    try {
        const response = await fetch(url, {
            headers: { 'Content-Type': 'application/json', 'Authorization': ` Bearer ${token}`},
            method: 'PUT',
            body: JSON.stringify(body)
        })
        const data: HttpResponse<T> = await response.json()
        return data
    } catch(error){
        console.log(error)
    }
}