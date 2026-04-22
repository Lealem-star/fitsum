import React from 'react';

const SponsorModal = ({
  isOpen,
  onClose,
  onSubmit,
  sponsorError,
  sponsorSuccess,
  sponsorForm,
  onSponsorChange,
  sponsorLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl p-6 sm:p-7 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-3 text-2xl text-gray-400 hover:text-gray-700"
          aria-label="Close sponsor form"
        >
          ×
        </button>

        <h3 className="text-2xl font-bold text-gray-900">Become A Sponsor</h3>
        <p className="mt-1 text-gray-600">Become a Sponsor and grow with Wechew Good!</p>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          {sponsorError && (
            <div className="rounded-md border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-sm">
              {sponsorError}
            </div>
          )}
          {sponsorSuccess && (
            <div className="rounded-md border border-green-200 bg-green-50 text-green-700 px-3 py-2 text-sm">
              {sponsorSuccess}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
            <input
              type="text"
              name="name"
              value={sponsorForm.name}
              onChange={onSponsorChange}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61dafb]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name of organization*
            </label>
            <input
              type="text"
              name="organization"
              value={sponsorForm.organization}
              onChange={onSponsorChange}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61dafb]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone number*</label>
            <input
              type="tel"
              name="phone"
              value={sponsorForm.phone}
              onChange={onSponsorChange}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61dafb]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={sponsorForm.email}
              onChange={onSponsorChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61dafb]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website Link</label>
            <input
              type="url"
              name="website"
              value={sponsorForm.website}
              onChange={onSponsorChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61dafb]"
            />
          </div>

          <button
            type="submit"
            disabled={sponsorLoading}
            className="w-full rounded-md bg-black text-white py-3 font-semibold hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {sponsorLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SponsorModal;

