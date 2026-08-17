type ApprovalPageProps = {
  searchParams: Promise<{
    token?: string;
    status?: string;
    message?: string;
  }>;
};

export default async function ApproveAppointmentPage({
  searchParams,
}: ApprovalPageProps) {
  const params = await searchParams;

  const token = params.token || "";
  const status = params.status || "";
  const message = params.message || "";

  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <main className="min-h-screen bg-[#f5f5f5] px-5 py-16">
      <div className="mx-auto max-w-2xl overflow-hidden bg-white shadow-xl">

        {/* HEADER */}
        <div className="border-b-[5px] border-red-600 bg-black px-8 py-9">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-red-600">
            Appointment Review
          </p>

          <h1 className="text-3xl font-black uppercase text-white md:text-4xl">
            Nita&apos;s Cleaning Services
          </h1>
        </div>

        {/* BODY */}
        <div className="px-8 py-10 md:px-12">

          {/* READY STATE */}
          {!isSuccess && !isError && (
            <>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-red-600">
                Final Confirmation
              </p>

              <h2 className="mb-5 text-3xl font-black text-black">
                Approve this appointment?
              </h2>

              <p className="mb-8 leading-7 text-neutral-600">
                Confirm that you have reviewed the customer&apos;s
                cleaning request and that the requested appointment
                can be accepted.
              </p>

              {!token ? (
                <div className="border-l-4 border-red-600 bg-red-50 p-6">
                  <p className="font-black text-red-600">
                    Invalid approval link.
                  </p>

                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    This page must be opened from the approval button
                    inside a cleaning-request notification email.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-8 bg-neutral-100 p-5">
                    <p className="text-sm leading-6 text-neutral-600">
                      The customer has <strong>not</strong> been
                      notified yet. Clicking the button below will
                      approve the request and send the customer an
                      appointment confirmation email.
                    </p>
                  </div>

                  <form
                    action="/api/approve-appointment"
                    method="POST"
                  >
                    <input
                      type="hidden"
                      name="token"
                      value={token}
                    />

                    <button
                      type="submit"
                      className="w-full cursor-pointer bg-red-600 px-6 py-5 text-sm font-black uppercase tracking-[0.15em] text-white transition hover:bg-red-700"
                    >
                      Confirm Appointment
                    </button>
                  </form>
                </>
              )}
            </>
          )}

          {/* SUCCESS STATE */}
          {isSuccess && (
            <div className="py-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl font-black text-green-700">
                ✓
              </div>

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                Appointment Approved
              </p>

              <h2 className="mt-3 text-3xl font-black text-black">
                Customer Notified
              </h2>

              <p className="mx-auto mt-5 max-w-md leading-7 text-neutral-600">
                The appointment has been approved and the customer
                confirmation email has been sent successfully.
              </p>
            </div>
          )}

          {/* ERROR STATE */}
          {isError && (
            <div className="py-8">
              <div className="border-l-4 border-red-600 bg-red-50 p-6">
                <p className="font-black uppercase text-red-600">
                  Unable to Approve
                </p>

                <p className="mt-3 leading-6 text-neutral-700">
                  {message ||
                    "Something went wrong while approving this appointment."}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="bg-black px-8 py-5 text-center text-xs text-neutral-500">
          Nita&apos;s Cleaning Services • Appointment Management
        </div>
      </div>
    </main>
  );
}