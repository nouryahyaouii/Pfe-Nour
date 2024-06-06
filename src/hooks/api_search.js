const SearchByImei = async () => {
  return new Promise((r, _) => {
    setTimeout(() => {
      r({ success: true, data: "invalid IMEI" });
    }, 1000);
  });
};

export { SearchByImei };
