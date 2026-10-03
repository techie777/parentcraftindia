import React from 'react';
import { X, Printer, ShieldCheck, CheckCircle2, FileText, Download } from 'lucide-react';

export default function InvoiceModal({ isOpen, onClose, booking }) {
  if (!isOpen || !booking) return null;

  const invoiceNo = `INV-2026-${booking.passCode ? booking.passCode.split('-')[2] : '948201'}`;
  const invoiceDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 relative">
        
        {/* Top Right Close Button */}
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-slate-100 text-slate-500 absolute top-4 right-4 print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Invoice Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-sm">🌱</div>
              <span className="text-xl font-black text-slate-900">Parvarish</span>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Official Payment Tax Invoice</p>
          </div>

          <div className="text-right text-xs">
            <div className="font-mono font-bold text-emerald-800">{invoiceNo}</div>
            <div className="text-slate-500">Date: {invoiceDate}</div>
          </div>
        </div>

        {/* Customer & Counselor Details */}
        <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Billed To (Parent):</span>
            <span className="font-bold text-slate-900 block mt-0.5">Priya Sharma</span>
            <span className="text-slate-500 text-[11px]">Parent Member</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Specialist Doctor:</span>
            <span className="font-bold text-slate-900 block mt-0.5">{booking.counselorName}</span>
            <span className="text-slate-500 text-[11px]">{booking.mode ? booking.mode.toUpperCase() : 'VIDEO'} Session</span>
          </div>
        </div>

        {/* Itemized Price Table */}
        <div className="space-y-3">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase">
                <th className="py-2">Service Package Description</th>
                <th className="py-2 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 font-semibold text-slate-900">
                  {booking.serviceTitle || 'Child Consultation Session'}
                </td>
                <td className="py-3 text-right font-bold text-slate-900">₹{booking.fee || 800}</td>
              </tr>
              <tr>
                <td className="py-2 text-slate-500">Platform Convenience Fee</td>
                <td className="py-2 text-right text-emerald-600 font-semibold">FREE (Promo)</td>
              </tr>
              <tr>
                <td className="py-2 text-slate-500">GST (Taxes Included)</td>
                <td className="py-2 text-right text-slate-500">₹0.00</td>
              </tr>
            </tbody>
          </table>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900">Total Amount Paid:</span>
            <span className="text-xl font-black text-emerald-800">₹{booking.fee || 800}</span>
          </div>
        </div>

        {/* Stamp & Footer */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
          <div className="flex items-center space-x-1 text-emerald-700 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>PAID & VERIFIED</span>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs print:hidden hover:bg-slate-800"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice</span>
          </button>
        </div>

      </div>
    </div>
  );
}
