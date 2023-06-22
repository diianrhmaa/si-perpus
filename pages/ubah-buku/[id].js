import React, { useEffect } from "react";
import Layout from "@/widget/Layout";
import Judul from "@/components/Header/Judul";
import { useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { async } from "@firebase/util";

const Ubahbuku = () => {
  const [namaBuku, setNamaBuku] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [deskripsiBuku, setDeskripsiBuku] = useState("");
  const [tahunTerbit, setTahunTerbit] = useState("");
  const router = useRouter();

  useEffect(() => {
    const id = router.query.id;
    if (id) {
      const getBukuListById = async () => {
        const bukuDocRef = doc(db, "buku", id);
        try {
          const docSnap = await getDoc(bukuDocRef);
          const dataBuku = docSnap.data();
          setNamaBuku(dataBuku.nama_buku);
          setPengarang(dataBuku.pengarang);
          setDeskripsiBuku(dataBuku.deskripsi_buku);
          setTahunTerbit(dataBuku.tahun_terbit);
          console.log(dataBuku);
        } catch (error) {
          console.error(error);
        }
      };
      getBukuListById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = async (e) => {
    const id = router.query.id;
    const bukuDocRef = doc(db, "buku", id);
    e.preventDefault();
    try {
      await updateDoc(bukuDocRef, {
        nama_buku: namaBuku,
        pengarang: pengarang,
        deskripsi_buku: deskripsiBuku,
        tahun_terbit: tahunTerbit,
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center mx-2 mt-10">
        <div className="w-[550px] rounded-lg shadow-gray-200 shadow-lg p-10">
          {/* judul form */}
          <Judul title="Form Ubah Buku" />
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="text-md">Nama Buku</label>
              <input
                className="mt-2 block w-11/12 rounded-xl border px-3 py-2"
                type="text"
                onChange={(e) => {
                  setNamaBuku(e.target.value);
                }}
                value={namaBuku}
              />
            </div>
            <div className="mb-3">
              <label className="text-md">Pengarang</label>
              <input
                className="mt-2 block w-11/12 rounded-xl border px-3 py-2"
                type="text"
                onChange={(e) => {
                  setPengarang(e.target.value);
                }}
                value={pengarang}
              />
            </div>
            <div className="mb-3">
              <label className="text-md">Deskripsi Buku</label>
              <input
                className="mt-2 block w-11/12 rounded-xl border px-3 py-2"
                type="text"
                onChange={(e) => {
                  setDeskripsiBuku(e.target.value);
                }}
                value={deskripsiBuku}
              />
            </div>
            <div className="mb-3">
              <label className="text-md">Tahun Terbit</label>
              <input
                className="mt-2 block w-11/12 rounded-xl border px-3 py-2"
                type="text"
                onChange={(e) => {
                  setTahunTerbit(e.target.value);
                }}
                value={tahunTerbit}
              />
            </div>
            <div className="text-center">
              <button className="bg-sky-500 hover:bg-sky-700 px-16 py-2 text-white rounded-full mt-3">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Ubahbuku;
