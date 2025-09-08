import React, { useState } from 'react';

interface CheckoutResponse {
  url: string;
}

const amounts = [10, 20, 50];

const DonationButtons: React.FC = () => {
  const [customAmount, setCustomAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDonate = async (amount: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Błąd płatności');
      }
      const data: CheckoutResponse = await res.json();
      window.location.href = data.url;
    } catch (e: any) {
      setError(e.message || 'Błąd płatności');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-2">
        {amounts.map(a => (
          <button
            key={a}
            className="btn-primary px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 disabled:opacity-50"
            disabled={loading}
            onClick={() => handleDonate(a)}
          >
            {`€${a}`}
          </button>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="number"
          min="1"
          step="0.01"
          value={customAmount}
          onChange={e => setCustomAmount(e.target.value)}
          className="border rounded-lg px-3 py-2 w-24"
          placeholder="Inna kwota"
          disabled={loading}
        />
        <button
          className="btn-primary px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 disabled:opacity-50"
          disabled={loading || !customAmount || Number(customAmount) <= 0}
          onClick={() => handleDonate(Number(customAmount))}
        >
          Przekaż
        </button>
      </div>
      {loading && <div className="text-primary">Przetwarzanie...</div>}
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
};

export default DonationButtons;
