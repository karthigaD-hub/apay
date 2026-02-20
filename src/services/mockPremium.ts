export const getMockPremium = async (data: any) => {
  // simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const idv = Number(data?.vehicle?.idv || 500000);

  const odPremium = Math.round(idv * 0.015);
  const tpPremium = 2072;
  const addonPremium = 800;

  const net = odPremium + tpPremium + addonPremium;
  const gst = Math.round(net * 0.18);
  const total = net + gst;

  return {
    success: true,
    odPremium,
    tpPremium,
    addonPremium,
    gst,
    total,
  };
};export const getMockPremium = async (data: any) => {
  // simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const idv = Number(data?.vehicle?.idv || 500000);

  const odPremium = Math.round(idv * 0.015);
  const tpPremium = 2072;
  const addonPremium = 800;

  const net = odPremium + tpPremium + addonPremium;
  const gst = Math.round(net * 0.18);
  const total = net + gst;

  return {
    success: true,
    odPremium,
    tpPremium,
    addonPremium,
    gst,
    total,
  };
};