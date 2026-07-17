const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let addressData = {
    houseNumber: "123/45",
    villageNumber: "หมู่ 3",
    road: "สุขุมวิท",
    alley: "สุขุมวิท 23",
    subDistrict: "คลองเตยเหนือ",
    district: "วัฒนา",
    province: "กรุงเทพมหานคร",
    postalCode: "10110"
};

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/profile", (req, res) => {
    res.json({
        name: "ณัฐวัฒน์ ขุ้ยแขก",
        department: "เทคโนโลยีสารสนเทศ",
        level: "ปวช.2"
    });
});

app.get("/address", (req, res) => {
    res.json(addressData);
});

app.post("/address", (req, res) => {
    const { 
        houseNumber, 
        villageNumber, 
        road, 
        alley, 
        subDistrict, 
        district, 
        province, 
        postalCode 
    } = req.body;

    if (!houseNumber || !subDistrict || !district || !province || !postalCode) {
        return res.status(400).json({
            message: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน (บ้านเลขที่, ตำบล, อำเภอ, จังหวัด, รหัสไปรษณีย์)"
        });
    }

    addressData = {
        houseNumber,
        villageNumber: villageNumber || "",
        road: road || "",
        alley: alley || "",
        subDistrict,
        district,
        province,
        postalCode
    };

    res.json({
        message: "อัปเดตข้อมูลที่อยู่สำเร็จ!",
        data: addressData
    });
});

app.listen(PORT, () => {
    console.log(`Server Start at http://localhost:${PORT}`);
});