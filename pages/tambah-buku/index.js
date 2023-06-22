import React, { useState } from 'react';
import Layout from '@/widget/Layout';
import { db } from '@/config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import {useRouter} from "next/router";

// buat use state untuk menyimpan data yang ditambahkam
const TambahBuku = () => {
    const [namaBuku, setNamaBuku] = useState("");
    const [pengarang, setPengarang] = useState("");
    const [deskrispiBuku, setDeskripsiBuku] = useState("");
    const [tahunTerbit, setTahunTerbit] = useState("");

    const router = useRouter();
    const bukuCollectionRef = collection(db, "buku");

    const SubmitHandler = async(e) => {
        // biar gahilang data di formnya
        e.preventDefault();
        try {
            await addDoc(bukuCollectionRef, {
                nama_buku: namaBuku,
                pengarang: pengarang,
                deskripsi_buku: deskrispiBuku,
                tahun_terbit: tahunTerbit,
            });
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Layout>
        <div className="flex justify-center mx-2 mt-10">
            <div className="w-[550px] rounded-lg shadow-gray-200 shadow-lg p-10">
                {/* judul form */}
                <div>
                    <h3 className="text-2xl font-bold mb-3">Form Tambah Buku</h3>
                </div>
                <form onSubmit={SubmitHandler}>
                    <div className="mb-3">
                        <label className="text-md">Nama Buku</label>
                        <input className="mt-2 block w-11/12 rounded-xl border px-3 py-2" type="text" onChange={(e)=> {setNamaBuku(e.target.value);
                        }}
                        value={namaBuku}
                    />
                    </div>
                    <div className="mb-3">
                        <label className="text-md">Pengarang</label>
                        <input className="mt-2 block w-11/12 rounded-xl border px-3 py-2" type="text" onChange={(e)=> {setPengarang(e.target.value);
                        }}
                        value={pengarang}
                    />
                    </div>
                    <div className="mb-3">
                        <label className="text-md">Deskripsi Buku</label>
                        <input className="mt-2 block w-11/12 rounded-xl border px-3 py-2" type="text"onChange={(e)=> {setDeskripsiBuku(e.target.value);
                        }}
                        value={deskrispiBuku}
                    />
                    </div>
                    <div className="mb-3">
                        <label className="text-md">Tahun Terbit</label>
                        <input className="mt-2 block w-11/12 rounded-xl border px-3 py-2" type="text" onChange={(e)=> {setTahunTerbit(e.target.value);
                        }}
                        value={tahunTerbit}
                    />
                    </div>
                    <div className="text-center">
                        <button className="bg-sky-500 hover:bg-sky-700 px-16 py-2 text-white rounded-full mt-3">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    </Layout>
  )
}

export default TambahBuku
