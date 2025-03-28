import { useEffect, useState } from "react";
import { getInventory, addInventoryItem, updateInventoryItem, deleteInventoryItem } from "../../api/InventoryApi";
import { useAuth } from "../../context/AuthContext";
import { BrowserMultiFormatReader } from "@zxing/library";

const InventoryPage = () => {
    const { ambulance } = useAuth();
    const ambulanceId = ambulance?.ambulance_id;

    const [inventory, setInventory] = useState([]);
    const [newItem, setNewItem] = useState({ id: "", rfid_id: "", name: "", code: "", type: "", quantity: "" });
    const [message, setMessage] = useState("");
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        if (ambulanceId) {
            fetchInventory();
        }
    }, [ambulanceId]);

    const fetchInventory = async () => {
        const response = await getInventory(ambulanceId);
        if (!response.error) {
            setInventory(response.items || []);
        } else {
            setMessage(response.error);
        }
    };

    const handleInputChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const handleAddItem = async () => {
        if (!newItem.id || !newItem.name || !newItem.quantity) {
            setMessage("❌ Please fill all required fields.");
            return;
        }
        const response = await addInventoryItem(ambulanceId, { ...newItem, quantity: parseInt(newItem.quantity) });
        if (!response.error) {
            setMessage("✅ Item added successfully!");
            fetchInventory();
            setNewItem({ id: "", rfid_id: "", name: "", code: "", type: "", quantity: "" });
        } else {
            setMessage(response.error);
        }
    };

    const handleDeleteItem = async (itemId) => {
        const response = await deleteInventoryItem(ambulanceId, itemId);
        if (!response.error) {
            setMessage("✅ Item deleted successfully!");
            fetchInventory();
        } else {
            setMessage(response.error);
        }
    };

    const startQRScanner = () => {
        setIsScanning(true);
        const codeReader = new BrowserMultiFormatReader();
        codeReader.getVideoInputDevices().then((videoDevices) => {
            if (videoDevices.length > 0) {
                codeReader.decodeFromVideoDevice(videoDevices[0].deviceId, "qr-video", (result, err) => {
                    if (result) {
                        try {
                            const scannedData = JSON.parse(result.text);
                            setNewItem(scannedData);
                            setMessage("✅ QR code scanned successfully!");
                            setIsScanning(false);
                            codeReader.reset();
                        } catch (error) {
                            setMessage("❌ Invalid QR Code format.");
                            setIsScanning(false);
                        }
                    }
                });
            } else {
                setMessage("❌ No camera found.");
                setIsScanning(false);
            }
        }).catch(() => {
            setMessage("❌ Camera access denied.");
            setIsScanning(false);
        });
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">🚑 Ambulance Inventory</h2>

            {message && (
                <p className={`text-center mb-4 text-sm font-medium p-2 rounded-lg ${message.includes("✅") ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}`}>
                    {message}
                </p>
            )}

            {/* Add Item Section */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 w-full max-w-lg">
                <h3 className="text-lg font-semibold mb-2">Add New Item</h3>
                <div className="grid grid-cols-2 gap-3">
                    <input type="text" name="id" placeholder="Item ID" value={newItem.id} onChange={handleInputChange} className="p-2 border rounded" />
                    <input type="text" name="rfid_id" placeholder="RFID ID (optional)" value={newItem.rfid_id} onChange={handleInputChange} className="p-2 border rounded" />
                    <input type="text" name="name" placeholder="Item Name" value={newItem.name} onChange={handleInputChange} className="p-2 border rounded" />
                    <input type="text" name="code" placeholder="Item Code (optional)" value={newItem.code} onChange={handleInputChange} className="p-2 border rounded" />
                    <input type="text" name="type" placeholder="Item Type" value={newItem.type} onChange={handleInputChange} className="p-2 border rounded" />
                    <input type="number" name="quantity" placeholder="Quantity" value={newItem.quantity} onChange={handleInputChange} className="p-2 border rounded" />
                </div>
                <button onClick={handleAddItem} className="mt-3 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all">Add Item</button>
                <button onClick={startQRScanner} className="mt-3 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-all">Scan QR Code</button>
            </div>

            {isScanning && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">Scanning QR Code...</h3>
                        <video id="qr-video" className="w-full h-64"></video>
                        <button onClick={() => setIsScanning(false)} className="mt-3 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-all">Cancel</button>
                    </div>
                </div>
            )}

            {/* Inventory List */}
            <div className="w-full max-w-lg">
                <h3 className="text-lg font-semibold mb-2">Current Inventory</h3>
                {inventory.length > 0 ? (
                    <ul className="space-y-3">
                        {inventory.map((item) => (
                            <li key={item.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                                <div>
                                    <p><strong>{item.name}</strong> (ID: {item.id})</p>
                                    <p>RFID: {item.rfid_id || "N/A"} | Code: {item.code || "N/A"} | Type: {item.type}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                                <button onClick={() => handleDeleteItem(item.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all">❌</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-600">No items found.</p>
                )}
            </div>
        </div>
    );
};

export default InventoryPage;
