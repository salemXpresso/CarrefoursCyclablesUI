"use client";
import { useRef, useState } from "react";
import downloadExcelFile from "@/app/helper/downloadExcel";
import importExcelData from "@/app/helper/importExcelData";
import {excelDateToDateString} from "@/app/helper/dateUtils";
import toOsmUrl from "@/app/helper/geoUtils";
import ModalForm from "@/app/components/ModalAddCarrefour";

interface Carrefours {
  id: number;
  name: string;
  date: string;
  explicitpriority: number;
  clear: number;
  covis: number;
  protected: number;
  continuity: number;
  protection: number;
  storage: number;
  slowdown: number;
  nofoot: number;
  short: number;
  obstacle: number;
  rightturn: number;
  priority: number;
  identifiable: number;
  standardize: number;
  quality: number;
  good: number;
  noborders: number;
  pollution: number;
  water: number;
  wind: number;
  heat: number;
  green: number;
  large: number;
  nice: number;
  security: number;
  comment: string;
  commentrm: string;
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [carrefours, setCarrefours] = useState<Carrefours[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
      <div className="relative overflow-x-auto flex justify-center items-center flex-col p-4 gap-10">
        <div className="flex justify-end w-[90%] gap-4">
          <button
              className="bg-slate-400 rounded-lg px-8 py-[10px] text-white uppercase"
              onClick={() => inputRef.current?.click()}
          >
            Import
            <input
                type="file"
                accept=".xlsx"
                className="hidden"
                onChange={(e) => importExcelData(e, setCarrefours, setCategories)}
                ref={inputRef}
            />
          </button>
          <button
              className="bg-slate-600 py-[10px] rounded-lg px-8 text-white uppercase"
              onClick={() => downloadExcelFile(carrefours)}
          >
            Export
          </button>
        </div>
        { carrefours.length>0 && (
        <table>
          <thead>
          <tr>
            {categories.map((category) => (
                <th key={category} className="p-2">
                  {category}
                </th>
            ))}
            <th>Carte</th>
          </tr>
          </thead>
          <tbody>
          {carrefours?.map((carrefour: Carrefours, key: number) => {
            return (
                <tr key={key} className={key % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td>{carrefour.id}</td>
                  <td>{carrefour.name}</td>
                  <td>{excelDateToDateString(carrefour.date)}</td>
                  <td>{carrefour.explicitpriority}</td>
                  <td>{carrefour.clear}</td>
                  <td>{carrefour.covis}</td>
                  <td>{carrefour.protected}</td>
                  <td>{carrefour.continuity}</td>
                  <td>{carrefour.protection}</td>
                  <td>{carrefour.storage}</td>
                  <td>{carrefour.slowdown}</td>
                  <td>{carrefour.nofoot}</td>
                  <td>{carrefour.short}</td>
                  <td>{carrefour.obstacle}</td>
                  <td>{carrefour.rightturn}</td>
                  <td>{carrefour.priority}</td>
                  <td>{carrefour.identifiable}</td>
                  <td>{carrefour.standardize}</td>
                  <td>{carrefour.quality}</td>
                  <td>{carrefour.good}</td>
                  <td>{carrefour.noborders}</td>
                  <td>{carrefour.pollution}</td>
                  <td>{carrefour.water}</td>
                  <td>{carrefour.wind}</td>
                  <td>{carrefour.heat}</td>
                  <td>{carrefour.green}</td>
                  <td>{carrefour.large}</td>
                  <td>{carrefour.nice}</td>
                  <td>{carrefour.security}</td>
                  <td>{carrefour.comment}</td>
                  <td>{carrefour.commentrm}</td>
                  <td>{carrefour.latitude}</td>
                  <td>{carrefour.longitude}</td>
                  <td><a href={toOsmUrl(carrefour.latitude, carrefour.longitude)} target="_blank">Lien</a></td>
                </tr>
            );
          })}
          </tbody>
        </table>
        )}
        <main className="flex items-center justify-center button-add">
          <ModalForm onSubmit={(newCarrefour) => setCarrefours([...carrefours, newCarrefour])} />
        </main>
      </div>
  );
}